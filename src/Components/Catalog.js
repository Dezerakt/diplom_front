import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../Assets/Layout";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Catalog(props) {
    const [newAlbums, setNewAlbums] = useState([])
    const back_url = process.env.REACT_APP_BACK_URL
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
            <Container
                fluid={true}
                style={{
                    marginTop: '25px'
                }}>
                <h1>Catalog</h1>
                <Row md={6}>
                    {
                        newAlbums.map(album => {
                            return (

                                <Col
                                    key={album.ID + '-' + album.name + '-col'}>
                                    <Link to={'/album/' + album.ID}>
                                        <Card className={"card-custom-class"}>
                                            <Card.Img variant="top" src={album.image_url} />
                                            <Card.Body>
                                                <Card.Title style={{color:'black'}}>{album.name}</Card.Title>
                                                <Card.Subtitle>
                                                    <Link to={'/singer/' + album.singer_id}>
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
        </Layout>
    );
}

export default Catalog;