import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom";
// const AppModule = require("./App.module.less");
import AppModule from "./index.module.less";
// console.log("iiii",AppModule)


class App extends Component {
    render(): ReactNode {
        return (
            <div className={AppModule.app}>111</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));