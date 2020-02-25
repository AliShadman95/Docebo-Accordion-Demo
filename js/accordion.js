function Accordion(options) {
  //Selecting the main container
  var accordionDiv = document.querySelector(`#${options.container}`);

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

  // Foreach panel we create the various elements
  options.panels.forEach((panel, index) => {
    // Creating the div container of the panel
    let panelDiv = document.createElement("div");

    // Creating the title, description and content div with relative paragraph elements of the panel and the divider
    let panelTitleDiv = document.createElement("div");
    let panelDescriptionDiv = document.createElement("div");
    let panelContentDiv = document.createElement("div");
    let panelTitleParagraph = document.createElement("p");
    let panelDescriptionParagraph = document.createElement("p");
    let divider = document.createElement("hr");

    //Setting the title,description and content
    panelTitleParagraph.innerHTML = panel.title;
    panelDescriptionParagraph.innerHTML = panel.subtitle;
    panelContentDiv.innerHTML += panel.content;

    // Adding the classes to the panel div, title, description and content
    panelDiv.classList.add("panel-div", "panel-with-description");
    panelTitleDiv.classList.add("panel-title");
    panelDescriptionDiv.classList.add("panel-description");
    panelContentDiv.classList.add("panel-content");

    //Appending the title, description, content to the relative div and then to the panel div
    panelTitleDiv.append(panelTitleParagraph);
    panelDescriptionDiv.append(panelDescriptionParagraph);
    panelDiv.append(panelTitleDiv);
    panelDiv.append(panelDescriptionDiv);
    panelDiv.append(panelContentDiv);

    // Appending the panel div to the root div
    accordionDiv.append(panelDiv);
    // Appending the divider to all the iterations beside the last one
    index !== options.panels.length - 1 ? accordionDiv.append(divider) : null;

    // Adding the event listeners for each panel
    panelDiv.addEventListener("click", () => {
      panelDiv.classList.toggle("panel-active");

      if (panelDiv.lastChild.style.display === "block") {
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
        panelDiv.lastChild.style.display = "none";
      } else {
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
        panelDiv.lastChild.style.display = "block";
      }
    });
  });
}
