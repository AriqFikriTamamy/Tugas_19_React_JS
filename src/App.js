import React, {Component} from "react";
import axios from "axios";
import "./style.css"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataApi:[],
      edit: false,
      dataPost: {
        id: "0",
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: ""
      }
    }
    this.inputChange = this.inputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  handleRemove(e){
    console.log(e.target.value);
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {method: "DELETE"}).then(res => this.reloadData());
  }

  inputChange(e){
    let newDataPost = {...this.state.dataPost};
    if(this.state.edit === false){
      newDataPost["id"] = new Date().getTime();
    }
    newDataPost[e.target.name] = e.target.value;
    // newDataPost[`nama_karyawan`] = "";
    // newDataPost[`jabatan`] = "";
    // newDataPost[`jenis_kelamin`] = "";
    // newDataPost[`tanggal_lahir`] = "";
    this.setState({
      dataPost: newDataPost
    }, () => console.log(this.state.dataPost));
    // console.log(e.target.value)
  }

  onSubmitForm(e){
    if(this.state.edit === false){
      axios.post('http://localhost:3004/data-karyawan/', this.state.dataPost).then(() =>{
        this.reloadData();
        this.clearData();
        }
      )
    }else{
      axios.put(`http://localhost:3004/data-karyawan/${this.state.dataPost.id}`, this.state.dataPost).then(() => {
        this.reloadData();
        this.clearData();
      })
    }

  }

  clearData = () => {
    let newDataPost = {...this.state.dataPost};

    newDataPost["id"] = "";
    newDataPost["nama_karyawan"] = "";
    newDataPost["jabatan"] = "";
    newDataPost["jenis_kelamin"] = "";
    newDataPost["tanggal_lahir"] = "";

    this.setState({
      dataPost: newDataPost
    })
  }

  getDataId = (e) => {
    axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`).then(res => this.setState({
      dataPost: res.data,
      edit: true
    }))
  }

  reloadData(){
    axios.get(`http://localhost:3004/data-karyawan/`).then(res => {
      this.setState({
        dataApi: res.data,
        edit: false
      })
    })
  }

  componentDidMount(){
    this.reloadData();
    // axios.get(`http://localhost:3004/data-karyawan/`).then(res => {console.log(res.data)})
  }
  render(){
    return(
      <div>
        <h1 className="h1" style={{backgroundColor: "brown", color: "white", textAlign: "center"}}>Data Karyawan</h1>
        <input style={{height: "30px"}} name="nama_karyawan" type="text" placeholder="Masukkan Nama Karyawan" value={this.state.dataPost.nama_karyawan} onChange={this.inputChange}/>
        <input style={{height: "30px", margin: "0 10px"}} name="jabatan" type="text" placeholder="Masukkan Jabatan" value={this.state.dataPost.jabatan} onChange={this.inputChange}/>
        <input style={{height: "30px", marginRight: "10px"}} name="jenis_kelamin" type="text" placeholder="Masukkan Jenis Kelamin" value={this.state.dataPost.jenis_kelamin} onChange={this.inputChange}/>
        <input style={{height: "30px", marginRight: "10px"}} name="tanggal_lahir" type="date" value={this.state.dataPost.tanggal_lahir} onChange={this.inputChange}/>
        <button type="submit" onClick={this.onSubmitForm} style={{backgroundColor: "blue", color: "white", height: "30px", width: "200px", borderStyle: "none"}}>Save Data</button>
        {this.state.dataApi.map((data, index) => {
          return(
            <div key={index} style={{margin: "10px 0px", border: "5px solid black", width: "300px", borderRadius: "10px"}}>
              <p style={{margin: "10px 10px"}}>Nama: {data.nama_karyawan}</p>
              <p style={{margin: "10px 10px"}}>Jabatan: {data.jabatan}</p>
              <p style={{margin: "10px 10px"}}>Jenis Kelamin: {data.jenis_kelamin}</p>
              <p style={{margin: "10px 10px"}}>Tanggal Lahir: {data.tanggal_lahir}</p>
              <button style={{backgroundColor: "red", color: "white", height: "30px", width: "100px", borderStyle: "none", margin: "10px 0 10px 10px"}} value={data.id} onClick={this.handleRemove}>Delete</button>
              <button style={{backgroundColor: "green", color: "white", height: "30px", width: "100px", borderStyle: "none", marginLeft: "5px"}} value={data.id} onClick={this.getDataId}>Edit Data</button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
