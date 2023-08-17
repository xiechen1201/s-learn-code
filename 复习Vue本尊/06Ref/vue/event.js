function bindEvent(methods, allNodes) {
  allNodes.forEach((element) => {
    const handleName = element.getAttribute("@click");

    if (handleName) {
      element.addEventListener("click", methods[handleName].bind(this));
    }
  });
}
export { bindEvent };
