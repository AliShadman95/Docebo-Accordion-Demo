function Accordion(options) {
  //Selecting the main container
  var accordionDiv = document.querySelector(`#${options.container}`);

  // If the accordion has a Main Title
  if (options.mainTitle) {
    // Create the title ,the inside paragraph element and the divider
    let titlePanel = document.createElement("div");
    let titleParagraph = document.createElement("p");
    let divider = document.createElement("hr");

    //Setting the title
    titleParagraph.innerHTML = options.mainTitle;

    //Adding classes to the div
    titlePanel.classList.add("panel-div", "panel-title-div");

    // Appending the created elements to the root div
    titlePanel.append(titleParagraph);
    accordionDiv.append(titlePanel);
    accordionDiv.append(divider);
  }

  // Foreach panel we create the various elements
  options.panels.forEach((panel, index) => {
    // Creating the div container of the panel
    let panelDiv = document.createElement("div");

    //Creating a bool for detecting if has a description
    let hasDescription = panel.subtitle;

    // Creating the title, description,button and content div with relative paragraph elements of the panel and the divider
    let panelTitleDiv = document.createElement("div");
    let panelDescriptionDiv = hasDescription
      ? document.createElement("div")
      : null;
    let panelContentDiv = document.createElement("div");
    let panelButtonDiv = document.createElement("div");
    let panelTitleParagraph = document.createElement("p");
    let panelDescriptionParagraph = hasDescription
      ? document.createElement("p")
      : null;
    let divider = document.createElement("hr");

    //Setting the title,description material icon and content
    panelTitleParagraph.innerHTML = panel.title;
    hasDescription
      ? (panelDescriptionParagraph.innerHTML = panel.subtitle)
      : null;
    panelContentDiv.innerHTML += panel.content;
    panelButtonDiv.innerHTML +=
      "<i class='material-icons'>keyboard_arrow_down</i >";

    // Adding the classes to the panel div, title, description and content
    panelDiv.classList.add(
      "panel-div",
      `${hasDescription ? "panel-with-description" : "panel-no-description"}`
    );
    panelTitleDiv.classList.add("panel-title");
    panelButtonDiv.classList.add("panel-button-div");
    !hasDescription ? (panelButtonDiv.style.marginTop = "1%") : null;
    hasDescription
      ? panelDescriptionDiv.classList.add("panel-description")
      : null;
    panelContentDiv.classList.add("panel-content");

    //Appending the title, description,button content to the relative div and then to the panel div
    panelTitleDiv.append(panelTitleParagraph);
    hasDescription
      ? panelDescriptionDiv.append(panelDescriptionParagraph)
      : null;
    panelDiv.append(panelButtonDiv);
    panelDiv.append(panelTitleDiv);
    hasDescription ? panelDiv.append(panelDescriptionDiv) : null;
    panelDiv.append(panelContentDiv);

    // Appending the panel div to the root div
    accordionDiv.append(panelDiv);

    // Appending the divider to all the iterations beside the last one
    index !== options.panels.length - 1 ? accordionDiv.append(divider) : null;

    // Adding the event listeners for each panel
    panelButtonDiv.addEventListener("click", () => {
      panelDiv.classList.toggle("panel-active");

      if (panelDiv.lastChild.style.maxHeight) {
        //Changing the arrow icon
        panelButtonDiv.innerHTML =
          "<i class='material-icons'>keyboard_arrow_down</i >";

        //Removing the separators divs
        panelDiv.previousSibling.remove();
        panelDiv.nextSibling.remove();

        //Readding the item divider line
        let divider = document.createElement("hr");
        let divider2 = document.createElement("hr");
        accordionDiv.insertBefore(divider, panelDiv);
        panelDiv.nextSibling !== null
          ? accordionDiv.insertBefore(divider2, panelDiv.nextSibling)
          : null;

        // Setting the styles
        panelDiv.lastChild.style.maxHeight = null;
      } else {
        //Changing the arrow icon
        panelButtonDiv.innerHTML =
          "<i class='material-icons'>keyboard_arrow_up</i >";

        //Removing the item divider line
        panelDiv.previousSibling.remove();
        panelDiv.nextSibling !== null ? panelDiv.nextSibling.remove() : null;

        // Creating separator divs for creating space between panels
        let separatorDiv1 = document.createElement("div");
        let separatorDiv2 = document.createElement("div");

        // Giving the classes to the separators element
        separatorDiv1.classList.add("panel-separator");
        separatorDiv2.classList.add("panel-separator");

        // Inserting the separator divs

        accordionDiv.insertBefore(separatorDiv1, panelDiv);
        accordionDiv.insertBefore(separatorDiv2, panelDiv.nextSibling);

        //Setting the styles
        panelDiv.lastChild.style.maxHeight =
          panelDiv.lastChild.scrollHeight + "px";
      }
    });
  });
}
