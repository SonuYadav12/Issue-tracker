"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, Form } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import z from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

// interface IssueForm {
//     title: string,
//     description: string
// }

//generate interface according to the schema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter();
    const [error, setError] = useState("");
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>(
        {
            resolver: zodResolver(createIssueSchema)
        }
    );
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
