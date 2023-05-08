import pyteal as pt
import beaker
from beaker.lib.storage import BoxMapping


class Electron(pt.abi.NamedTuple):
    owner: pt.abi.Field[pt.abi.Address]
    name: pt.abi.Field[pt.abi.String]
    description: pt.abi.Field[pt.abi.String]
    imageURL: pt.abi.Field[pt.abi.String]
    price: pt.abi.Field[pt.abi.Uint64]
    sold: pt.abi.Field[pt.abi.Uint64]
    likes: pt.abi.Field[pt.abi.Uint64]
    dislikes: pt.abi.Field[pt.abi.Uint64]


class ElectronState:
    id = beaker.GlobalStateValue(
        pt.TealType.uint64,
        default=pt.Int(0)
    )

    electronics = BoxMapping(pt.abi.Uint64, Electron)

    def __init__(self, *, electron_type: type[pt.abi.BaseType]):
        self.electron_type = electron_type
        self.electronics = BoxMapping(pt.abi.Uint64, electron_type)


app = (
    beaker.Application(
        "ElectronApp",
        state=ElectronState(electron_type=Electron)
    )
    .apply(
        beaker.unconditional_create_approval, initialize_global_state=True
    )
)


@app.external
def add_electronics(
        pay_txn: pt.abi.PaymentTransaction, name: pt.abi.String,
        description: pt.abi.String, imageURL: pt.abi.String, price: pt.abi.Uint64
) -> pt.Expr:
    return pt.Seq(
        # 1. Pay for box space
        pt.Assert
            (
            pay_txn.get().receiver() == pt.Global.current_application_address(),
            pay_txn.get().amount() >= pt.Int(3000),
            price.get() > pt.Int(0),

            name.get() != pt.String(""),
            description.get() != pt.String(""),
            imageURL.get() != pt.String("")

        ),

        # 2. Add electronics to storage
        # set the different electronics parameters
        (OWNER := pt.abi.Address()).set(pt.Txn.sender()),
        (NAME := pt.abi.String()).set(name.get()),
        (DESCRIPTION := pt.abi.String()).set(description.get()),
        (IMAGEURL := pt.abi.String()).set(imageURL.get()),
        (PRICE := pt.abi.Uint64()).set(price.get()),
        (SOLD := pt.abi.Uint64()).set(pt.Int(0)),
        (LIKES := pt.abi.Uint64()).set(pt.Int(0)),
        (DISLIKES := pt.abi.Uint64()).set(pt.Int(0)),

        electronics_item = Electron(OWNER, NAME, DESCRIPTION, IMAGEURL, PRICE, SOLD, LIKES, DISLIKES)

        app.state.electronics[pt.Itob(app.state.id)].set(electronics_item),

        app.state.id.set(app.state.id + pt.Int(1))
    )


@app.external
def read_electronics(id: pt.abi.Uint64, *, output: Electron):
    return output.decode(app.state.electronics[id].get())


@app.external
def buy_electronics(pay_txn: pt.abi.PaymentTransaction, id: pt.abi.Uint64, number: pt.abi.Uint64) -> pt.Expr:
    return pt.Seq(

        (ELECTRONICS := Electron()).decode(app.state.electronics[id].get()),
        (OWNER := pt.abi.Address()).set(ELECTRONICS.owner),

        (NAME := pt.abi.String()).set(ELECTRONICS.name),
        (DESCRIPTION := pt.abi.String()).set(ELECTRONICS.description),
        (IMAGEURL := pt.abi.String()).set(ELECTRONICS.imageURL),

        (PRICE := pt.abi.Uint64()).set(ELECTRONICS.price),
        (SOLD := pt.abi.Uint64()).set(ELECTRONICS.sold),

        (LIKES := pt.abi.Uint64()).set(ELECTRONICS.likes),
        (DISLIKES := pt.abi.Uint64()).set(ELECTRONICS.dislikes),

        pt.Assert(pay_txn.get().receiver() == OWNER.get()),
        pt.Assert((number.get() * PRICE.get()) == pay_txn.get().amount()),

        SOLD = pt.Uint64(SOLD.get() + number.get())
        ELECTRONICS = Electron(OWNER, NAME, DESCRIPTION, IMAGEURL, PRICE, SOLD, LIKES, DISLIKES)
        app.state.electronics[id].set(ELECTRONICS)

    )


@app.external
def get_electronics_length(*, output: pt.abi.Uint64):
    return output.set(app.state.id)


# # LIKE
@app.external
def like(id: pt.abi.Uint64):
    return pt.Seq(
        # get the electronics with the id
        (ELECTRONICS := Electron()).decode(app.state.electronics[id].get()),
        (OWNER := pt.abi.Address()).set(ELECTRONICS.owner),

        (NAME := pt.abi.String()).set(ELECTRONICS.name),
        (DESCRIPTION := pt.abi.String()).set(ELECTRONICS.description),

        (IMAGEURL := pt.abi.String()).set(ELECTRONICS.imageURL),

        (PRICE := pt.abi.Uint64()).set(ELECTRONICS.price),

        (SOLD := pt.abi.Uint64()).set(ELECTRONICS.sold),

        (LIKES := pt.abi.Uint64()).set(ELECTRONICS.likes),
        # increment the like
        LIKES.set(LIKES.get() + pt.Int(1)),
        DISLIKES = pt.Uint64(ELECTRONICS.dislikes)

        ELECTRONICS.set(OWNER, NAME, DESCRIPTION, IMAGEURL, PRICE, SOLD, LIKES, DISLIKES),
        app.state.electronics[id].set(ELECTRONICS)
    )


# DISLIKE
@app.external
def dislike(id: pt.abi.Uint64):
    return pt.Seq(
        # get the electronics with the id
        (ELECTRONICS := Electron()).decode(app.state.electronics[id].get()),
        (OWNER := pt.abi.Address()).set(ELECTRONICS.owner),

        (NAME := pt.abi.String()).set(ELECTRONICS.name),
        (DESCRIPTION := pt.abi.String()).set(ELECTRONICS.description),

        (IMAGEURL := pt.abi.String()).set(ELECTRONICS.imageURL),

        (PRICE := pt.abi.Uint64()).set(ELECTRONICS.price),
        (SOLD := pt.abi.Uint64()).set(ELECTRONICS.sold),

        (LIKES := pt.abi.Uint64()).set(ELECTRONICS.likes),

        # increment the dislike
        (DISLIKES := pt.abi.Uint64()).set(ELECTRONICS.dislikes),
        DISLIKES.set(DISLIKES.get() + pt.Int(1)),

        ELECTRONICS.set(OWNER, NAME, DESCRIPTION, IMAGEURL, PRICE, SOLD, LIKES, DISLIKES),
        app.state.electronics[id].set(ELECTRONICS)
    )


app_spec = app.build()
approval_program, clear_program = app_spec.approval_program, app_spec.clear_program
app_spec.export("artifacts")
