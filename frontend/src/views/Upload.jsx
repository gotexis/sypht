import React from "react"
import axios from "axios"

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  async getToken() {
    let response
    try {
      response = await axios.post('https://login.sypht.com/oauth/token', {
        client_id: process.env.REACT_APP_SYPHT_CLIENT_ID,
        client_secret: process.env.REACT_APP_SYPHT_CLIENT_SECRET,
        audience: "https://api.sypht.com",
        grant_type: "client_credentials"
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
    } catch (e) {
      console.log(e)
    }
    return response.data
  }

  async fileUpload(file) {
    // const url = 'https://api.sypht.com/fileupload';
    const url = 'http://localhost:5000/upload';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'Accept': 'application/json',
        'content-type': 'multipart/form-data',
      }
    }
    return axios.post(url, formData, config)
  }

  render() {
    return <main className="column main">
      <nav className="breadcrumb is-small" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Home</a></li>
          <li className="is-active"><a href="#" aria-current="page">Forms</a></li>
        </ul>
      </nav>

      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="title">Forms
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button type="button" className="button is-small">
              March 8, 2017 - April 6, 2017
            </button>
          </div>
        </div>
      </div>

      <div className="columns is-multiline">
        <div className="column is-9">
          <form onSubmit={this.onFormSubmit}>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Question</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="file" className="textarea" placeholder="Explain how we can help you"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" type={"submit"}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </main>;
  }
}

export default Upload