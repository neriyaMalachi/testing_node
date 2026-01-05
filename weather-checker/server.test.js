import test from "node:test";
import assert from "node:assert/strict";
import { app } from "./server.js";

test("POST /check-weather → safe true", async () => {
    // פורט זמני הוא בעצם אומר למחשב תן לי פורט פנוי עושים את זה לבדיקות בכדי לא להתקל בפורטים אחרים
  const server = app.listen(0); 

  const port = server.address().port;
  
  const res = await fetch(`http://localhost:${port}/check-weather`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      temperature: 25,
      windSpeed: 20,
    }),
  });

  const data = await res.json();

  assert.equal(data.safe, true);

  server.close();
});
