<script>
    import { onMount } from 'svelte';
    import User from '../assets/unnamed.png';
    import InboxNavbar from './InboxNavbar.svelte';
    import Sidebar from './Sidebar.svelte';
    import Icon from '@iconify/svelte';

    
    let emails = [];
    let expandedEmailId = null;
    let selectedEmail = null;

    // Función para clasificar un email
    async function classifyEmail(id) {
        try {
            const response = await fetch(`http://localhost:3000/classify-email?id=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const classification = await response.json();

            emails = emails.map(email => {
                if (email.id === id) {
                    email.budget = classification.color;
                    email.label = classification.label;
                }
                return email;
            });
        } catch (error) {
            console.error('Error classifying email:', error);
        }
    }

    // Función para actualizar los emails
    async function refreshEmails() {
        try {
            const response = await fetch('http://localhost:3000/emails');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            emails = await response.json();
            expandedEmailId = null;
            selectedEmail = null;
        } catch (error) {
            console.error('Error refreshing emails:', error);
        }
    }

    function getColorFromLabel(label) {
        switch (label) {
            case 'TechRequest':
                return '#eb8deb'; 
            case 'Certificates':
                return '#f1f186'; 
            case 'Forwarded':
                return '#9bf09b'; 
            case 'Registration':
                return '#f5cf89';
            default:
                return '#000000';
        }
    }

    onMount(async () => {
        await refreshEmails();
    });

    function toggleExpand(id) {
        if (expandedEmailId === id) {
            expandedEmailId = null;
            selectedEmail = null;
        } else {
            expandedEmailId = id;
            selectedEmail = emails.find(email => email.id === id);
        }
    }

    function toggleVote(emailId, type) {
        emails = emails.map(email => {
            if (email.id === emailId) {
                if (type === 'up') {
                    email.upVoted = !email.upVoted;
                    email.downVoted = false;
                } else if (type === 'down') {
                    email.downVoted = !email.downVoted;
                    email.upVoted = false;
                }
            }
            return email;
        });
    }

    function formatHorario(horario) {
        if (!horario) return '';
        return horario.slice(0, 5);
    }

</script>

<div class="flex justify-between bg-gradient-to-t from-bg to-bg_gradient">
    <Sidebar/>
    <div class="w-2/3 h-full">
        <div class="flex justify-start items-center gap-3 p-4 ml-10 text-txt_color text-lg">
            <button on:click={refreshEmails}>
                <Icon icon="charm:refresh" />
            </button>
            <button>
                <Icon class="text-md" icon="gravity-ui:bars-descending-align-left" />
            </button>
        </div>
        <div class="w-full ml-10">
            {#each emails as email}
                <button class="flex items-center justify-center border-b border-gray-700 relative hover:bg-select w-full text-left"
                    on:click={() => toggleExpand(email.id)}>
                    <img src={User} alt="User" class="w-14 h-14 rounded-full mr-3 object-cover shadow-md" />
                    <div class="flex-grow my-2">
                        <span class="font-bold text-[18px] text-blue-500">{email.name}</span>
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-txt_color text-[15px]">{email.subject}</span>
                        </div>
                        <p class="text-gray-600 text-md py-1">
                            {#if expandedEmailId === email.id}
                                {email.text}
                                <button class="text-blue-500" on:click={(e) => {e.stopPropagation(); toggleExpand(email.id);}}>Show less</button>
                            {:else}
                                {email.text.slice(0, 100)}...
                                <button class="text-blue-500" on:click={(e) => {e.stopPropagation(); toggleExpand(email.id);}}>Show more</button>
                            {/if}
                        </p>
                    </div>
                    <div class="flex flex-col justify-end items-center">
                        <div class="flex items-center justify-end text-xs 2xl:text-lg">
                            <button
                                class="{email.upVoted ? 'text-green-400' : 'text-gray-500'} focus:outline-none transition-colors duration-300"
                                on:click={(e) => { e.stopPropagation(); toggleVote(email.id, 'up'); }}
                            >
                                <i class="fa-solid fa-thumbs-up"></i>
                            </button>
                            <button
                                class="ml-4 {email.downVoted ? 'text-red-400' : 'text-gray-500'} focus:outline-none transition-colors duration-300"
                                on:click={(e) => { e.stopPropagation(); toggleVote(email.id, 'down'); }}
                            >
                                <i class="fa-solid fa-thumbs-down"></i>
                            </button>
                        </div>
                        {#if email.label}
                            <span class="text-black text-[10px] font-semibold p-1 rounded my-1" style="background-color: {getColorFromLabel(email.label)};">{email.label}</span>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    </div>

    {#if selectedEmail}
        <div class="h-[800px] w-[1000px] absolute top-44 right-16 text-txt_color p-3 rounded-2xl bg-select">
            <div class="flex items-center gap-3 justify-between">
                <div class="flex items-center gap-3">
                    <img class="w-20 h-20 rounded-full" src={User} alt="">
                    <div>
                        <p class="text-md text-txt_color font-bold">{selectedEmail.name}</p>
                        <p class="text-sm text-txt_color">{selectedEmail.sender}</p>
                    </div>
                </div>
                <div class="flex flex-col text-2xl items-end">
                    <div class="flex gap-6 my-3 items-center">
                        <Icon icon="ph:arrow-bend-up-left-bold" />
                        <Icon icon="ph:arrow-bend-double-up-left" />
                        <Icon icon="bi:arrow-right" />
                    </div>
                    <p class="text-[17px] text-blue-500 my-2">{formatHorario(selectedEmail.horario)}</p>
                </div>
            </div>
            <div class="text-txt_color w-full my-4">
                {selectedEmail.text}
            </div>
        </div>
    {/if}

    <InboxNavbar/>
</div>
<style>

    .fa-solid {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        font-style: normal;
    }
  
  </style>
  