import React, { Component } from 'react';
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import 'react-awesome-query-builder/css/antd.less';
import 'react-awesome-query-builder/css/styles.scss';
import { Button, Spin, message } from "antd";
import { navigate } from "@reach/router"


const config = {
    ...BasicConfig,
    fields: {
        age: {
            label: 'Age',
            type: 'number',
            fieldSettings: {
                min: 10,
            },
            valueSources: ['value'],
            preferWidgets: ['number'],
        },
        gender: {
            label: 'Gender',
            type: 'select',
            valueSources: ['value'],
            listValues: [
            ],
        },
        language: {
            label: 'Language',
            type: 'select',
            valueSources: ['value'],
            listValues: [
            ],
        },
        channel: {
            label: 'Channel',
            type: 'select',
            valueSources: ['value'],
            listValues: [
            ],
        },
        marketing: {
            label: 'Marketing?',
            type: 'boolean',
            operators: ['equal'],
            valueSources: ['value'],
        }
    }
}


const queryValue = { "id": QbUtils.uuid(), "type": "group" };

class ConditionBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: { ...config },
            tree: '',
            loading: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        fetch("/api/subjects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(QbUtils.mongodbFormat(this.state.tree, config))
        })
            .catch(err => console.log(err));
            message.success('You added a new subject');
            navigate('/')

    }


    fetchData = () => {
        fetch("api/config")
            .then(response => response.json())
            .then(responseJson => {
                config.fields.language.listValues = responseJson.language
                config.fields.gender.listValues = responseJson.gender
                config.fields.channel.listValues = responseJson.channel
                this.setState({ config: config })
                this.setState({ tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config) })
                this.setState({loading: false})
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.fetchData()
    }


    render = () => {
     if(this.state.loading === true){
         return  <Spin size="large" />;
     }
       return (
            <div >
                <Query
                    {...config}
                    value={this.state.tree}
                    onChange={this.onChange}
                    renderBuilder={this.renderBuilder}
                />
                {this.sendQuery(this.handleSubmit)}

            </div>
        )
    }

    renderBuilder = (props) => (
        <div className="query-builder-container" style={{ marginLeft: 20 }}>
            <div className="query-builder qb-lite">
                <Builder {...props} />
            </div>
        </div>
    )


    sendQuery = (props) => (
        <div style={{ marginBottom:30, marginLeft: 33}} >
            < Button onClick={props}> Create new </Button >
        </div>
    )

    onChange = (immutableTree, config) => {
        this.setState({ tree: immutableTree, config: config });
        const jsonTree = QbUtils.getTree(immutableTree);
        console.log(jsonTree);
    }
}

export default ConditionBuilder;
