export function* registerArticleAsync(action) {
    console.log(action);
    debugger;
    yield console.log("finish");
}