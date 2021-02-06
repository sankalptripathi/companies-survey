import React, { Fragment } from "react";
import {Tabs, Tab} from 'react-bootstrap-tabs';

const Tabs = (e) => {
    return (
        <Tabs defaultActiveKey="profile" id="">
            <Tab eventKey="home" title="Home">
                <Sonnet />
            </Tab>
        </Tabs>
            )
}