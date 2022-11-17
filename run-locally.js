import { app } from "./app.js";

// For Heroku
/* 
if (Deno.args.length > 0) {
    const lastArgument = Deno.args[Deno.args.length - 1];
    app.listen({ port: Number(lastArgument) });
}
*/

app.listen({ port: 7777 });
