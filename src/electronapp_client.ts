import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Electron {
    owner: string = "";
    name: string = "";
    description: string = "";
    imageURL: string = "";
    price: bigint = BigInt(0);
    sold: bigint = BigInt(0);
    likes: bigint = BigInt(0);
    dislikes: bigint = BigInt(0);
    static codec: algosdk.ABIType = algosdk.ABIType.from("(address,string,string,string,uint64,uint64,uint64,uint64)");
    static fields: string[] = ["owner", "name", "description", "imageURL", "price", "sold", "likes", "dislikes"];
    static decodeResult(val: algosdk.ABIValue | undefined): Electron {
        return bkr.decodeNamedTuple(val, Electron.fields) as Electron;
    }
    static decodeBytes(val: Uint8Array): Electron {
        return bkr.decodeNamedTuple(Electron.codec.decode(val), Electron.fields) as Electron;
    }
}
export class ElectronApp extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { id: { type: bkr.AVMType.uint64, key: "id", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA2NTUzNiAzNApieXRlY2Jsb2NrIDB4IDB4Njk2NCAweDE1MWY3Yzc1CnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDk2OGQzYjFlIC8vICJhZGRfZWxlY3Ryb25pY3MocGF5LHN0cmluZyxzdHJpbmcsc3RyaW5nLHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMTMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg3ZmU3NjNlZSAvLyAicmVhZF9lbGVjdHJvbmljcyh1aW50NjQpKGFkZHJlc3Msc3RyaW5nLHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIKPT0KYm56IG1haW5fbDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZWIwODYxZGIgLy8gImJ1eV9lbGVjdHJvbmljcyhwYXksdWludDY0LHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyMjY5OTdjZCAvLyAiZ2V0X2VsZWN0cm9uaWNzX2xlbmd0aCgpdWludDY0Igo9PQpibnogbWFpbl9sMTAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg0ZmI3ZGI1YSAvLyAibGlrZSh1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyM2IyMDJiYSAvLyAiZGlzbGlrZSh1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDgKZXJyCm1haW5fbDg6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpjYWxsc3ViIGRpc2xpa2VfNgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sOToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpidG9pCmNhbGxzdWIgbGlrZV81CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRlbGVjdHJvbmljc2xlbmd0aF80CnN0b3JlIDkKYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CmxvYWQgOQppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDExOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKc3RvcmUgNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgOAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDYKbG9hZCA2Cmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KYXNzZXJ0CmxvYWQgNgpsb2FkIDcKbG9hZCA4CmNhbGxzdWIgYnV5ZWxlY3Ryb25pY3NfMwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTI6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpjYWxsc3ViIHJlYWRlbGVjdHJvbmljc18yCnN0b3JlIDUKYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CmxvYWQgNQpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCnN0b3JlIDMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNApidG9pCnN0b3JlIDQKdHhuIEdyb3VwSW5kZXgKaW50Y18xIC8vIDEKLQpzdG9yZSAwCmxvYWQgMApndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApsb2FkIDAKbG9hZCAxCmxvYWQgMgpsb2FkIDMKbG9hZCA0CmNhbGxzdWIgYWRkZWxlY3Ryb25pY3NfMQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KYm56IG1haW5fbDE2CmVycgptYWluX2wxNjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CnByb3RvIDAgMApieXRlY18xIC8vICJpZCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBhZGRfZWxlY3Ryb25pY3MKYWRkZWxlY3Ryb25pY3NfMToKcHJvdG8gNSAwCmJ5dGVjXzAgLy8gIiIKZHVwbiAzCmludGNfMCAvLyAwCmR1cG4gMwpieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTUKZ3R4bnMgUmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KYXNzZXJ0CmZyYW1lX2RpZyAtNQpndHhucyBBbW91bnQKcHVzaGludCAzMDAwIC8vIDMwMDAKPj0KYXNzZXJ0CmZyYW1lX2RpZyAtMQppbnRjXzAgLy8gMAo+CmFzc2VydApmcmFtZV9kaWcgLTQKZXh0cmFjdCAyIDAKYnl0ZWNfMCAvLyAiIgohPQphc3NlcnQKZnJhbWVfZGlnIC0zCmV4dHJhY3QgMiAwCmJ5dGVjXzAgLy8gIiIKIT0KYXNzZXJ0CmZyYW1lX2RpZyAtMgpleHRyYWN0IDIgMApieXRlY18wIC8vICIiCiE9CmFzc2VydAp0eG4gU2VuZGVyCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApsZW4KcHVzaGludCAzMiAvLyAzMgo9PQphc3NlcnQKZnJhbWVfZGlnIC00CmV4dHJhY3QgMiAwCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpsZW4KaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgMQpjb25jYXQKZnJhbWVfYnVyeSAxCmZyYW1lX2RpZyAtMwpleHRyYWN0IDIgMApmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDIKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDIKY29uY2F0CmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgLTIKZXh0cmFjdCAyIDAKZnJhbWVfYnVyeSAzCmZyYW1lX2RpZyAzCmxlbgppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyAzCmNvbmNhdApmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIC0xCmZyYW1lX2J1cnkgNAppbnRjXzAgLy8gMApmcmFtZV9idXJ5IDUKaW50Y18wIC8vIDAKZnJhbWVfYnVyeSA2CmludGNfMCAvLyAwCmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMQpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMgpmcmFtZV9idXJ5IDExCnB1c2hpbnQgNzAgLy8gNzAKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyA5CmZyYW1lX2RpZyAxMgpsZW4KKwpmcmFtZV9idXJ5IDEwCmZyYW1lX2RpZyAxMAppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDIKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTEKZnJhbWVfZGlnIDEyCmNvbmNhdApmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKZnJhbWVfZGlnIDEyCmxlbgorCmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDEwCmludGNfMiAvLyA2NTUzNgo8CmFzc2VydApmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgMwpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMQpmcmFtZV9kaWcgMTIKY29uY2F0CmZyYW1lX2J1cnkgMTEKZnJhbWVfZGlnIDEwCmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgNAppdG9iCmNvbmNhdApmcmFtZV9kaWcgNQppdG9iCmNvbmNhdApmcmFtZV9kaWcgNgppdG9iCmNvbmNhdApmcmFtZV9kaWcgNwppdG9iCmNvbmNhdApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgOApieXRlY18xIC8vICJpZCIKYXBwX2dsb2JhbF9nZXQKaXRvYgpib3hfZGVsCnBvcApieXRlY18xIC8vICJpZCIKYXBwX2dsb2JhbF9nZXQKaXRvYgpmcmFtZV9kaWcgOApib3hfcHV0CmJ5dGVjXzEgLy8gImlkIgpieXRlY18xIC8vICJpZCIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKKwphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIHJlYWRfZWxlY3Ryb25pY3MKcmVhZGVsZWN0cm9uaWNzXzI6CnByb3RvIDEgMQpieXRlY18wIC8vICIiCmZyYW1lX2RpZyAtMQppdG9iCmJveF9nZXQKc3RvcmUgMTEKc3RvcmUgMTAKbG9hZCAxMQphc3NlcnQKbG9hZCAxMApmcmFtZV9idXJ5IDAKcmV0c3ViCgovLyBidXlfZWxlY3Ryb25pY3MKYnV5ZWxlY3Ryb25pY3NfMzoKcHJvdG8gMyAwCmJ5dGVjXzAgLy8gIiIKZHVwbiA0CmludGNfMCAvLyAwCmR1cG4gNQpieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTIKaXRvYgpib3hfZ2V0CnN0b3JlIDEzCnN0b3JlIDEyCmxvYWQgMTMKYXNzZXJ0CmxvYWQgMTIKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmV4dHJhY3QgMCAzMgpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCAzMiAvLyAzMgpleHRyYWN0X3VpbnQxNgpmcmFtZV9kaWcgMAppbnRjXzMgLy8gMzQKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKaW50Y18zIC8vIDM0CmV4dHJhY3RfdWludDE2CmZyYW1lX2RpZyAwCnB1c2hpbnQgMzYgLy8gMzYKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCAzNiAvLyAzNgpleHRyYWN0X3VpbnQxNgpkaWcgMQpsZW4Kc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDQKZnJhbWVfZGlnIDAKcHVzaGludCAzOCAvLyAzOApleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDAKcHVzaGludCA0NiAvLyA0NgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDAKcHVzaGludCA1NCAvLyA1NApleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDcKZnJhbWVfZGlnIDAKcHVzaGludCA2MiAvLyA2MgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIC0zCmd0eG5zIFJlY2VpdmVyCmZyYW1lX2RpZyAxCj09CmFzc2VydApmcmFtZV9kaWcgLTEKZnJhbWVfZGlnIDUKKgpmcmFtZV9kaWcgLTMKZ3R4bnMgQW1vdW50Cj09CmFzc2VydApmcmFtZV9kaWcgNgpmcmFtZV9kaWcgLTEKKwpmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDIKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKZnJhbWVfYnVyeSAxMQpwdXNoaW50IDcwIC8vIDcwCmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQpmcmFtZV9kaWcgMTIKbGVuCisKZnJhbWVfYnVyeSAxMApmcmFtZV9kaWcgMTAKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA5Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAzCmZyYW1lX2J1cnkgMTIKZnJhbWVfZGlnIDExCmZyYW1lX2RpZyAxMgpjb25jYXQKZnJhbWVfYnVyeSAxMQpmcmFtZV9kaWcgMTAKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyA5CmZyYW1lX2RpZyAxMgpsZW4KKwpmcmFtZV9idXJ5IDEwCmZyYW1lX2RpZyAxMAppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDQKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTEKZnJhbWVfZGlnIDEyCmNvbmNhdApmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDYKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDcKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDgKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDExCmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIC0yCml0b2IKYm94X2RlbApwb3AKZnJhbWVfZGlnIC0yCml0b2IKZnJhbWVfZGlnIDAKYm94X3B1dApyZXRzdWIKCi8vIGdldF9lbGVjdHJvbmljc19sZW5ndGgKZ2V0ZWxlY3Ryb25pY3NsZW5ndGhfNDoKcHJvdG8gMCAxCmludGNfMCAvLyAwCmJ5dGVjXzEgLy8gImlkIgphcHBfZ2xvYmFsX2dldApmcmFtZV9idXJ5IDAKcmV0c3ViCgovLyBsaWtlCmxpa2VfNToKcHJvdG8gMSAwCmJ5dGVjXzAgLy8gIiIKZHVwbiA0CmludGNfMCAvLyAwCmR1cG4gNQpieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTEKaXRvYgpib3hfZ2V0CnN0b3JlIDE1CnN0b3JlIDE0CmxvYWQgMTUKYXNzZXJ0CmxvYWQgMTQKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmV4dHJhY3QgMCAzMgpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCAzMiAvLyAzMgpleHRyYWN0X3VpbnQxNgpmcmFtZV9kaWcgMAppbnRjXzMgLy8gMzQKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKaW50Y18zIC8vIDM0CmV4dHJhY3RfdWludDE2CmZyYW1lX2RpZyAwCnB1c2hpbnQgMzYgLy8gMzYKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCAzNiAvLyAzNgpleHRyYWN0X3VpbnQxNgpkaWcgMQpsZW4Kc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDQKZnJhbWVfZGlnIDAKcHVzaGludCAzOCAvLyAzOApleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDAKcHVzaGludCA0NiAvLyA0NgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDAKcHVzaGludCA1NCAvLyA1NApleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDcKZnJhbWVfZGlnIDcKaW50Y18xIC8vIDEKKwpmcmFtZV9idXJ5IDcKZnJhbWVfZGlnIDAKcHVzaGludCA2MiAvLyA2MgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDIKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKZnJhbWVfYnVyeSAxMQpwdXNoaW50IDcwIC8vIDcwCmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQpmcmFtZV9kaWcgMTIKbGVuCisKZnJhbWVfYnVyeSAxMApmcmFtZV9kaWcgMTAKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA5Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAzCmZyYW1lX2J1cnkgMTIKZnJhbWVfZGlnIDExCmZyYW1lX2RpZyAxMgpjb25jYXQKZnJhbWVfYnVyeSAxMQpmcmFtZV9kaWcgMTAKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyA5CmZyYW1lX2RpZyAxMgpsZW4KKwpmcmFtZV9idXJ5IDEwCmZyYW1lX2RpZyAxMAppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDQKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTEKZnJhbWVfZGlnIDEyCmNvbmNhdApmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDYKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDcKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDgKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDExCmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIC0xCml0b2IKYm94X2RlbApwb3AKZnJhbWVfZGlnIC0xCml0b2IKZnJhbWVfZGlnIDAKYm94X3B1dApyZXRzdWIKCi8vIGRpc2xpa2UKZGlzbGlrZV82Ogpwcm90byAxIDAKYnl0ZWNfMCAvLyAiIgpkdXBuIDQKaW50Y18wIC8vIDAKZHVwbiA1CmJ5dGVjXzAgLy8gIiIKZHVwCmZyYW1lX2RpZyAtMQppdG9iCmJveF9nZXQKc3RvcmUgMTcKc3RvcmUgMTYKbG9hZCAxNwphc3NlcnQKbG9hZCAxNgpmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKZXh0cmFjdCAwIDMyCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMApwdXNoaW50IDMyIC8vIDMyCmV4dHJhY3RfdWludDE2CmZyYW1lX2RpZyAwCmludGNfMyAvLyAzNApleHRyYWN0X3VpbnQxNgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMAppbnRjXzMgLy8gMzQKZXh0cmFjdF91aW50MTYKZnJhbWVfZGlnIDAKcHVzaGludCAzNiAvLyAzNgpleHRyYWN0X3VpbnQxNgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMApwdXNoaW50IDM2IC8vIDM2CmV4dHJhY3RfdWludDE2CmRpZyAxCmxlbgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgNApmcmFtZV9kaWcgMApwdXNoaW50IDM4IC8vIDM4CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNQpmcmFtZV9kaWcgMApwdXNoaW50IDQ2IC8vIDQ2CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNgpmcmFtZV9kaWcgMApwdXNoaW50IDU0IC8vIDU0CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgMApwdXNoaW50IDYyIC8vIDYyCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgOApmcmFtZV9kaWcgOAppbnRjXzEgLy8gMQorCmZyYW1lX2J1cnkgOApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMgpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMgpmcmFtZV9idXJ5IDExCnB1c2hpbnQgNzAgLy8gNzAKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyA5CmZyYW1lX2RpZyAxMgpsZW4KKwpmcmFtZV9idXJ5IDEwCmZyYW1lX2RpZyAxMAppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDkKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDMKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTEKZnJhbWVfZGlnIDEyCmNvbmNhdApmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKZnJhbWVfZGlnIDEyCmxlbgorCmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDEwCmludGNfMiAvLyA2NTUzNgo8CmFzc2VydApmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgNApmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMQpmcmFtZV9kaWcgMTIKY29uY2F0CmZyYW1lX2J1cnkgMTEKZnJhbWVfZGlnIDEwCmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgNQppdG9iCmNvbmNhdApmcmFtZV9kaWcgNgppdG9iCmNvbmNhdApmcmFtZV9kaWcgNwppdG9iCmNvbmNhdApmcmFtZV9kaWcgOAppdG9iCmNvbmNhdApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgLTEKaXRvYgpib3hfZGVsCnBvcApmcmFtZV9kaWcgLTEKaXRvYgpmcmFtZV9kaWcgMApib3hfcHV0CnJldHN1Yg==";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "add_electronics", desc: "", args: [{ type: "pay", name: "pay_txn", desc: "" }, { type: "string", name: "name", desc: "" }, { type: "string", name: "description", desc: "" }, { type: "string", name: "imageURL", desc: "" }, { type: "uint64", name: "price", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "read_electronics", desc: "", args: [{ type: "uint64", name: "id", desc: "" }], returns: { type: "(address,string,string,string,uint64,uint64,uint64,uint64)", desc: "" } }),
        new algosdk.ABIMethod({ name: "buy_electronics", desc: "", args: [{ type: "pay", name: "pay_txn", desc: "" }, { type: "uint64", name: "id", desc: "" }, { type: "uint64", name: "number", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_electronics_length", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "like", desc: "", args: [{ type: "uint64", name: "id", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "dislike", desc: "", args: [{ type: "uint64", name: "id", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async add_electronics(args: {
        pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        name: string;
        description: string;
        imageURL: string;
        price: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.add_electronics({ pay_txn: args.pay_txn, name: args.name, description: args.description, imageURL: args.imageURL, price: args.price }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async read_electronics(args: {
        id: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<[
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint
    ]>> {
        const result = await this.execute(await this.compose.read_electronics({ id: args.id }, txnParams));
        return new bkr.ABIResult<[
            string,
            string,
            string,
            string,
            bigint,
            bigint,
            bigint,
            bigint
        ]>(result, result.returnValue as [
            string,
            string,
            string,
            string,
            bigint,
            bigint,
            bigint,
            bigint
        ]);
    }
    async buy_electronics(args: {
        pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        id: bigint;
        number: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.buy_electronics({ pay_txn: args.pay_txn, id: args.id, number: args.number }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_electronics_length(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_electronics_length(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async like(args: {
        id: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.like({ id: args.id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async dislike(args: {
        id: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.dislike({ id: args.id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        add_electronics: async (args: {
            pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
            name: string;
            description: string;
            imageURL: string;
            price: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "add_electronics"), { pay_txn: args.pay_txn, name: args.name, description: args.description, imageURL: args.imageURL, price: args.price }, txnParams, atc);
        },
        read_electronics: async (args: {
            id: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "read_electronics"), { id: args.id }, txnParams, atc);
        },
        buy_electronics: async (args: {
            pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
            id: bigint;
            number: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "buy_electronics"), { pay_txn: args.pay_txn, id: args.id, number: args.number }, txnParams, atc);
        },
        get_electronics_length: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_electronics_length"), {}, txnParams, atc);
        },
        like: async (args: {
            id: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "like"), { id: args.id }, txnParams, atc);
        },
        dislike: async (args: {
            id: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "dislike"), { id: args.id }, txnParams, atc);
        }
    };
}
