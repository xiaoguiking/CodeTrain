import React from 'react'
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Order from '../pages/order';
import Query from '../pages/query';
import Ticket from '../pages/ticket';

export default [
    {
        path: "/",
        component: Home,
        routes: [
            {
                path: "/",
                exact: true,
                render: () => (
                    <Redirect to={"/home"} />
                ),
            },
            {
                path: "/order",
                component: Order
            },
            {
                path: '/ticket',
                component: Ticket
            },
            {
                path: "/query",
                component: Query
            }
        ]
    },
]