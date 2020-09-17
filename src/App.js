import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      page: 3
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users/MikSuki/repos')
      .then(function (response) {
        return response.json();
      })
      .then((function (myJson) {
        this.setState({
          ...this.state,
          repos: myJson
        })
        console.log('github data-> ')
        console.log(myJson)
        document.onscroll = () => this.scroll()
      }).bind(this));
  }

  scroll() {
    const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop
    const curY = window.innerHeight + scrollPos
    const maxY = document.body.offsetHeight
    if (curY >= maxY) {
      this.setState({
        ...this.state,
        page: this.state.page + 1
      })
    }
  }

  render() {
    return (
      <>
        <h1>MikSuki - public repo</h1>
        <ul class="list-group">
          {
            this.state.repos.map((e, i) =>
              i < this.state.page ?
                <Repo key={e.id} data={e} /> : null
            )
          }
        </ul>
      </>
    )
  }
}

class Repo extends React.Component {
  render() {
    const { name, description, html_url } = this.props.data
    return (
      <li className="list-group-item" style={{ height: '50vh' }}>
        <h4>{name}</h4>
        <p>{description ? description : 'no description'}</p>
        <a href={html_url} className="btn btn-primary" target="_blank">Go github</a>
      </li >
    )
  }
}

export default App;
