import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../app.js";

// Test that api returns correct data (JSON, CORS allowed)
Deno.test({
    name: "Api_test",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
        .set("Content-Type", "application/json")
        .send('{"questionId":2, "optionId":2}')
        .expect("access-control-allow-origin", "*")
        .expect('{"correct":true}')
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

