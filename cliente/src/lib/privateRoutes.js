import { goto } from '$app/navigation';

import { onMount } from 'svelte';

export function CheckLogin() {
    onMount(async () => {
        const url = 'http://localhost:8000/api/token/get';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let isLoggined;

        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            console.log("You need to login to access that page");
            goto('/');
        }
    });
}