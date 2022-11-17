import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../app.js";

// Test that entering to /topics or /quiz unauthenticated redirects to /auth/login
Deno.test({
    name: "middleware_test",
    async fn() {
        const testClient1 = await superoak(app);
        await testClient1
        .get("/quiz")
        .expect("Redirecting to /auth/login.");

        const testClient2 = await superoak(app);
        await testClient2
        .post("/topics/2/delete")
        .expect("Redirecting to /auth/login.");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that entering to / or root path doesn't redirects to /auth/login
Deno.test({
    name: "middleware_test2",
    async fn() {
        const testClient1 = await superoak(app);
        await testClient1
        .get("/api/questions/random")
        .expect(200);

        const testClient2 = await superoak(app);
        await testClient2
        .get("/")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});