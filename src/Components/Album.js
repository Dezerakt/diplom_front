import React, {useState, useEffect} from 'react';
import Layout from "../Assets/Layout";
import {useParams} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import axios from "axios";

function Album(props) {
    const [album, setAlbum] = useState([]);
    const back_url = process.env.REACT_APP_BACK_URL;
    let {album_id} = useParams()

    useEffect(() => {
        return () => {
            axios.get(back_url + '/api/album/' + album_id)
                .then(response => {
                    setAlbum(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);


    return (
        <Layout>
            <Container fluid={false}>
                <Row>
                    <Col>
                        <Image src={album.image_url}
                            style={{
                                width: '500px',
                                height: '500px'
                            }}
                        />
                    </Col>
                    <Col>
                        <span>name:</span>
                        <h1>{album.name}</h1>
                        <span>singer name:</span>
                        <h1>{album.singer_name}</h1>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Album;