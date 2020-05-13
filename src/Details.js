import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends React.Component {
  state = {
    laoding: true,
    showModal: false,
  };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) =>
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      })
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

  render() {
    const {
      loading,
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <div o>
          <h1>{name}</h1>
          <h2>
            {animal}-{breed}-{location}
          </h2>
          <ThemeContext.Consumer>
            {([themeHook]) => (
              <button
                style={{ backgroundColor: themeHook }}
                onClick={this.toggleModal}
              >
                {" "}
                Adopt {name}{" "}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Whould you like to adopt {name} ?</h1>
              </div>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I am a monster</button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
