"use client"
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, Form } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const router = useRouter();
    const [error, setError] = useState("");
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <div className='max-w-xl '>
            {error && <Callout.Root className=' mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data)
                        router.push("/issues")
                    } catch (error) {
                        setError("An unexpected error has occured");
                    }

                })}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />

                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
