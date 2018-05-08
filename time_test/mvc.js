class MyModel {
    constructor() {
        this.currentDate = new Date();

        setInterval(() => {
            this.currentDate = new Date();
            if (this.onChangeNotify) {
                this.onChangeNotify();
            }
        }, 1000);
    }

    setOnChangeNotify(onChangeNotify) {
        if (onChangeNotify && typeof(onChangeNotify) != 'function')
            throw "notify parameter should be a function";

        this.onChangeNotify = onChangeNotify;
    }

    getCurrentDate() {
        return this.currentDate;
    }
}

class MyView {
    constructor(hostElement) {
        this.hostElement = hostElement;
        this.viewElement = null;
        this.checkElement = null;
    }

    setModel(model) {
        this.model = model;
    }

    setOnCheckboxChanged(onCheckboxChanged) {
        this.onCheckboxChanged = onCheckboxChanged;
    }

    render() {
        if (!this.viewElement) {
            this.viewElement = document.createElement('div');
            this.hostElement.appendChild(this.viewElement);

            this.checkElement = document.createElement('input');
            this.checkElement.type = 'checkbox';
            this.checkElement
                .addEventListener('change', e => this.refreshCheckbox());
            this.hostElement.appendChild(this.checkElement);
            this.refreshCheckbox();            
        }
        if (this.model) {
            this.viewElement.textContent =
                this.model.getCurrentDate();
        }
    }

    refreshCheckbox() {
        if (this.onCheckboxChanged) {
            this.onCheckboxChanged(this.checkElement.checked);
        }
    }
}

class MyController {
    constructor(model, view) {
        view.setModel(model);
        view.setOnCheckboxChanged(isChecked => this.onCheckboxChanged(isChecked));
        this.model = model;
        view.render();
        this.view = view;
    }

    onCheckboxChanged(isChecked) {
        if (isChecked) {
            this.model.setOnChangeNotify(() => this.view.render());
        } else {
            this.model.setOnChangeNotify(null);
        }
    }
}

class ApplicationController {
    constructor() {
        this.timerController = new MyController(
            new MyModel(),
            new MyView(document.body)
        );
    }
}