import * as React from 'react';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';


interface ContainerState {

}

interface ContainerProps {

}

class MainContainer extends React.Component<ContainerProps, ContainerState> {

  constructor(props: ContainerProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <Container />
        <Footer />
      </>
    );
  }
}

export default MainContainer;