import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get<{ fruit: string }>("/eat/:fruit", (req, res) => {
  const fruit = req.params.fruit;
  res.json({
    message: `Yum yum - you ate an ${fruit}!`,
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{ exampleRouteParameter: string; two: string }>(
  "/echo/:exampleRouteParameter/:two",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    const partTwo = req.params.two;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
      example: `my test: ${partTwo}`,
    });
  }
);

app.get<{ numOne: number; numTwo: number }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = numOne * numTwo;

    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

app.get<{ numOne: number; numTwo: number; numThree: number }>(
  "/sum/:numOne/:numTwo/:numThree?",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */

    const { numOne, numTwo, numThree } = req.params;
    const sum = numOne + numTwo;

    res.json({
      original: `${numOne} + ${numTwo} + ${
        numThree !== undefined ? ` + ${numThree}` : ""
      }: `,

      result: sum,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ hello: string }>("/shout/:hello", (req, res) => {
  const hello = req.params.hello;

  res.json({
    shout: `${hello}`,
  });
});
// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
