import React, { Component } from "react";
import Modal from "./components/Modal";
import ImageGallery from "./components/ImageGallery";
import Spinner from "./components/Loader";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import apiService from "./services/apiService";

import styles from "./App.module.css";

class App extends Component {
  state = {
    isShowModal: false,
    hits: [],
    currentPage: 1,
    searchQuery: "",
    largeImage: "",
    isLoading: false,
  };

  componentDidUpdate(prevprops, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getDataApi();
    }
  }

  getDataApi = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    apiService
      .fetchHits(options)
      .then((hits) => {
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
      currentPage: 1,
      hits: [],
    });
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  openModal = (img) => {
    this.setState({ largeImage: img });
    this.toggleModal();
  };

  render() {
    const { isShowModal, isLoading, hits } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearch} />
        {hits.length > 0 && <ImageGallery hits={hits} onClick={this.openModal} />}
        {isLoading && <Spinner />}
        {shouldRenderLoadMoreButton && <Button onClick={this.getDataApi} />}
        {isShowModal && <Modal largeImage={this.state.largeImage} onClose={this.toggleModal} />}
      </div>
    );
  }
}

export default App;
