import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { assertStringIncludes } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { app } from "../app.js";
import * as topicController from "../routes/controllers/topicController.js";
import * as answerController from "../routes/controllers/answerController.js";
import * as questionController from "../routes/controllers/questionController.js";
import * as mainController from "../routes/controllers/mainController.js";

// Test that registering and logging in works as planned
Deno.test({
    name: "loginAndRegisterController_test",
    async fn() {
        const testClient1 = await superoak(app);
        await testClient1
        .post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("email=admin@admin.com")
        .send("password=123456")
        .expect("Redirecting to /topics.");
        
        const testClient2 = await superoak(app);
        await testClient2
        .post("/auth/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("email=student@student.com")
        .send("password=6666")
        .expect("Redirecting to /auth/login.");

        const testClient3 = await superoak(app);
        await testClient3
        .post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("email=student@student.com")
        .send("password=6666")
        .expect("Redirecting to /topics.");

    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that root page works as expected
Deno.test({
    name: "loginAndRegisterController_test",
    async fn() {
        const testClient1 = await superoak(app);
        await testClient1
        .get("/")
        .set("Content-Type", "text/html")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

