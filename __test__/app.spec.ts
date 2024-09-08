import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => {

    describe("Pruebas del endpoint raíz /", () => {

        test("test de endpoint /", async () => {
            return await request(app)
                .get("/")
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
                });
        });
    });

    describe("Pruebas del endpoint /key", () => {
        test("test de endpoint /key ", async () => {
            return await request(app)
                .get("/key")
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
                });
        });
    });

    describe("Pruebas del endpoint /palindromo", () => {

        test("debería volver es palindromo /palindromo/abccba", async () => {
            let a = "abccba";
            return await request(app)
                .get("/palindromo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, La frase ingresada es palindromo`);
                });
        });


        test("debería volver es palindromo /palindromo/abc cba", async () => {
            let a = "abc cba";
            return await request(app)
                .get("/palindromo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, La frase ingresada es palindromo`);
                });
        });

        test("debería volver no es palindromo /palindromo/abcabc", async () => {
            let a = "abcabc";
            return await request(app)
                .get("/palindromo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, La frase ingresada no es palindromo`);
                });
        });

    });

    describe("Pruebas del endpoint /primo", () => {
        test("debería devolver no primo para /primo/-1", async () => {
            let a = -1;
            return await request(app)
                .get("/primo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
                });
        });

        test("debería devolver no primo para /primo/1", async () => {
            let a = 1;
            return await request(app)
                .get("/primo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
                });
        });

        test("debería devolver primo para /primo/2", async () => {
            let a = 2;
            return await request(app)
                .get("/primo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, el numero ingresado es un numero primo`);
                });
        });

        test("debería devolver no primo para /primo/4", async () => {
            let a = 4;
            return await request(app)
                .get("/primo/" + a)
                .expect("Content-Type", /text/)
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
                });
        });
        
        

        test("debería devolver 404 para /primo sin parámetro", async () => {
            return await request(app)
                .get("/primo")
                .expect(404);
        });
    });
});
