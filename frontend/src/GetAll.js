import "antd/dist/antd.css";
import React, { Component } from "react";
import { Table, Layout, Spin, Button, message } from "antd";
const { Header } = Layout;

export default class GetAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loading: true,
    };
  }

  fetchData = () => {
    fetch("api/subjects")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        const results = responseJson.map(object => ({
          key: object.id,
          age: object.data.age,
          language: object.data.language,
          gender: object.data.gender,
          channel: object.data.channel,
          marketing: object.data.marketing
        }));
        this.setState({ subjects: results });
        this.setState({loading: false})
      })

      .catch(err => console.log(err));
  };

 onClick(key){
 console.log('clicked')
 fetch('api/subjects/' + key, {
  method: 'DELETE',
})
this.fetchData();
message.success('You deleted a subject');
 }


  componentDidMount() {
    this.fetchData();
  }
  render() {
    const columns = [
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Data",
        dataIndex: "data",
        key: "data"
      },
      {
        title: "Language",
        dataIndex: "language",
        key: "language"
      },
      {
        title: "Channel",
        dataIndex: "channel",
        key: "channel"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "Accepts marketing",
        dataIndex: "marketing",
        key: "marketing",
        render: (it: Boolean) => <span>{it ? "true" : "false"}</span>
      },
      {
        title: "Delete subject",
        key: "action",
        render: (record) => (
          <span>
            <Button onClick={() => this.onClick(record.key)}>Delete</Button>
          </span>
        ),
      }
    ];

    if(this.state.loading === true){
    return   <Spin size="large" />;
      }
    return (
      <div>
        {(this.state.subjects.length >=1 )
          ? <div>
            <Table  columns={columns}  dataSource={this.state.subjects} />
          </div>
          : <Layout>
            <Header style={{ backgroundColor: '#bdbab3',  color: '#0e0447', fontWeight: 'bold' }}>
              Add a new subject
            </Header>
          </Layout>}
      </div>
    )
  }
}

