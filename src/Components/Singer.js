import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";

function Singer(props) {
    const [singerInfo, setSingerInfo] = useState(null);
    const back_url = process.env.REACT_APP_BACK_URL
    const { singer_id } = useParams();

    useEffect(() => {
        return () => {
            axios.get(back_url + "/api/singer/" + singer_id)
                .then(response => {
                    console.log(response.data)
                    setSingerInfo(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);


    return (
        <Layout>

        </Layout>
    );
}

export default Singer;