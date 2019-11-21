import React from "react"

export default class Select extends React.Component {

    state = {
        userNameList: [],
        suggestedList: [],
        onInput: false,
        selectedValue: null,
        listPosition: { top: 0, left: 0 },
        value: ""
    }

    handleOnClick = (event) => {
        this.setState({
            onInput: true,
            listPositionStyle: {
                top: event.currentTarget.offsetTop + event.currentTarget.offsetHeight,
                left: event.currentTarget.offsetLeft
            }
        })
    }

    handleOnBlur = (event) => {
        console.log(event);
        this.setState((state, props)=>{
            return {
                onInput: false,
                value: state.suggestedList[0] ? state.suggestedList[0] : ""
            }
        })
    }

    handleOnChange = (event) => {
        const { value } = event.currentTarget
        this.setState((state, props)=>{
            const newSuggestedList = state.userNameList.filter((name)=>
                name.toLowerCase().includes(value.toLowerCase()))
            return { 
                suggestedList: newSuggestedList,
                value: newSuggestedList.length === 1 ? newSuggestedList[0] : value
            }
        })
    }

    handleOptionClick = (event) => {
        console.log(event)
    }

    componentDidMount() {
        fetch('https://reqres.in/api/users').then(res => res.json()).then(res => {
            const names = res.data.map(user => user.first_name)
            this.setState({ userNameList: names, suggestedList: names })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="autoselect-box" onClick={this.handleOnClick}>
                    {this.state.onInput ?
                        <React.Fragment>
                        <input 
                            className="autoselect-box__input" 
                            autoFocus
                            value={this.state.value} 
                            onBlur={this.handleOnBlur}
                            onChange={this.handleOnChange} 
                        />
                        <div className="list-container" style={{ ...this.state.listPositionStyle, 
                            display: this.state.onInput ? 'block' : 'none' 
                            }}>
                            <ul className="ul-list">
                                {this.state.suggestedList.map(userName =>
                                    <li className="ul-list__element" onClick={this.handleOptionClick}  key={userName} value={userName}>{userName}</li>)}
                            </ul>
                        </div>
                        </React.Fragment>
                        :
                        <div className="autoselect-box__selected-value">
                            {this.state.value}
                        </div>
                    }
                    {/* <div className="list-container" onBlur={this.handleOnBlur} style={{ ...this.state.listPositionStyle, 
                        display: this.state.onInput ? 'block' : 'none' 
                        }}>
                        <ul className="ul-list">
                            {this.state.suggestedList.map(userName =>
                                <li className="ul-list__element" onClick={this.handleOptionClick}  key={userName} value={userName}>{userName}</li>)}
                        </ul>
                    </div> */}
                </div>
            </React.Fragment>
        )

    }
}