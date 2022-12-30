import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../Assets/Layout";
import {Card, CardGroup, Carousel, CarouselItem, Col, Container, FormText, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Main(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [active, setActive] = useState(false);
    const [newAlbums, setNewAlbums] = useState([])

    useEffect(() => {
        return () => {
            axios.get(back_url + '/api/album/get-all', )
                .then(promise => {
                    setNewAlbums(promise.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);

    return (
        <Layout>
            <Container>
                <h1>Недавно добавленные</h1>
                <Row md={6}>
                    {
                        newAlbums.map(album => {
                            return (

                                <Col>
                                    <Link to={'/'}>
                                        <Card className={"card-custom-class"}>
                                            <Card.Img variant="top" src={album.image_url} />
                                            <Card.Body>
                                                <Card.Title style={{color:'black'}}>{album.name}</Card.Title>
                                                <Card.Subtitle>
                                                    <Link to={'/a'}>
                                                        {album.singer_name}
                                                    </Link>
                                                </Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>

                            )
                        })
                    }

                </Row>
            </Container>

            <Carousel style={{
                backgroundColor: '#3a3a3a',
                paddingTop: '250px'
            }}>
                <Carousel.Item>
                    <Container>
                        <Row md={6}>
                            {
                                newAlbums.map(album => {
                                    return (

                                        <Col>
                                            <Link to={'/'}>
                                                <Card className={"card-custom-class"}>
                                                    <Card.Img variant="top" src={album.image_url} />
                                                    <Card.Body>
                                                        <Card.Title style={{color:'black'}}>{album.name}</Card.Title>
                                                        <Card.Subtitle>
                                                            <Link to={'/a'}>
                                                                {album.singer_name}
                                                            </Link>
                                                        </Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>

                                    )
                                })
                            }

                        </Row>
                    </Container>
                </Carousel.Item>
                <Carousel.Item>
                    <Container>
                        <Row md={6}>
                            {
                                newAlbums.map(album => {
                                    return (

                                        <Col>
                                            <Link to={'/'}>
                                                <Card className={"card-custom-class"}>
                                                    <Card.Img variant="top" src={album.image_url} />
                                                    <Card.Body>
                                                        <Card.Title style={{color:'black'}}>{album.name}</Card.Title>
                                                        <Card.Subtitle>
                                                            <Link to={'/a'}>
                                                                {album.singer_name}
                                                            </Link>
                                                        </Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>

                                    )
                                })
                            }

                        </Row>
                    </Container>
                </Carousel.Item>
            </Carousel>
        </Layout>

    );
}

export default Main;