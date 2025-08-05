// src/mocks/index.ts
export async function initMocks() {
  if (typeof window === "undefined") {
    // 서버 환경 (Node.js)
    const { server } = await import("./server");
    server.listen({
      onUnhandledRequest: "bypass",
    });
    return server;
  } else {
    // 브라우저 환경
    const { worker } = await import("./browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
    return worker;
  }
}

export {};
