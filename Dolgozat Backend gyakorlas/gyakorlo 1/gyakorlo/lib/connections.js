export var run = function (req, res) {
    return new Promise(function (resolve) {
        resolve({ message: "Hello, World!" });
    });
};
export default { run: run };
