import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
// import fakeIndexedDB from 'fake-indexeddb';
// import { JSDOM } from 'jsdom';
import "fake-indexeddb/auto";
// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Replace the real IndexedDB with the fake one
// globalThis.indexedDB = fakeIndexedDB;

// create a fake DOM environment for the tests
// const dom = new JSDOM('<!doctype html><html><body></body></html>');
// globalThis.document = dom.window.document;
// globalThis.window = dom.window;

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

