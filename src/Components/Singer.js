import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Col, Container, Image, ListGroup, Row, Table} from "react-bootstrap";

function Singer(props) {
    const [singer, setSinger] = useState(null);
    const back_url = process.env.REACT_APP_BACK_URL
    let {singer_id} = useParams();

    useEffect(() => {
        axios.get(back_url + "/api/singer/" + singer_id)
            .then(response => {
                setSinger(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    return (
        <Layout>
            <Container fluid={true}>

                {
                    singer ?
                        <Row xs={10}>
                            <Col xs={2}>
                                <Image src={singer.image_url}
                                       style={{
                                           width: '250px',
                                           height: '250px'
                                       }}
                                />
                            </Col>
                            <Col xs={6}>
                                <h1>{singer.name}</h1>
                                <span>{singer.description}</span>
                            </Col>
                            <Col xs={12} style={{
                                marginTop: '10px'
                            }}>
                                <Table hover={true} horizontal={true}>
                                    <tbody>
                                    {
                                        singer.albums ? singer.albums.map(album => {
                                            return (

                                                <tr key={album.id + '-album'}>
                                                    <td>
                                                        <Link to={'/album/' + album.ID}>
                                                        <Image style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            marginRight: '10px'
                                                        }} src={album.image_url}/>
                                                            {album.name}
                                                        </Link>
                                                    </td>
                                                </tr>

                                            )
                                        }) : null
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        :
                        null
                }

            </Container>
        </Layout>
    );
}

export default Singer;