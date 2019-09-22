if(!App) {
    throw Error("wrong load");
}

let page = new App.Page();
let buttons = new App.Buttons();

page.reveal();
buttons.start();

