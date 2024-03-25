import { Navbar, Nav, Container, Card, Button, Image } from "react-bootstrap";

const DesignHome = () => {
  const isLoggedIn = true; // Example: Set to true if user is logged in

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">E-commerce App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            {/* Add more navigation links as needed */}
          </Nav>
          {isLoggedIn && (
            <Image
              src="/profile.jpg"
              roundedCircle
              style={{ width: "40px", height: "40px" }}
            />
          )}
        </Container>
      </Navbar>

      {/* Product Cards */}
      <Container style={{ marginTop: "70px", marginBottom: "70px" }}>
        <h2>Featured Products</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Example Product Card */}
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src="product.jpg" />
            <Card.Body>
              <Card.Title>Product Name</Card.Title>
              <Card.Text>
                Some quick example text to build on the product description.
              </Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
          {/* Add more Product Cards here */}
        </div>
      </Container>

      {/* Footer */}
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Container>
          <Navbar.Text>
            &copy; 2024 E-commerce App. All rights reserved.
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default DesignHome;
