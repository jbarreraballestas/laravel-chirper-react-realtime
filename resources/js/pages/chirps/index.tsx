import AppLayout from '@/layouts/app-layout';
import { FormEventHandler, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import echo from '@/echo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import {Chirp as ChirpType} from "@/types";
import Chirp from '@/components/chirp';


type ChirpForm = {
    message: string;
};



export default function ChirpsIndex({ chirps }: { chirps: ChirpType[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ChirpForm>>({
        message: '',
    });
    useEffect(() => {
        console.log("use effect");
        echo.join(`chat`)
            .here((users: any) => {
                console.log(users);
            })
            .joining((user: any) => {
                console.log(user.name);
            })
            .leaving((user: any) => {
                console.log(user.name);
            })
            .error((error: any) => {
                console.error(error);
            });
    }, []);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('chirps.store'), {
            onFinish: () => reset('message'),
        });
    };
    return (
        <AppLayout>
            <Head title="Chirps" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">

                                <Input
                                    id="message"
                                    type='text'
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="What's on your mind?"
                                ></Input>
                                <InputError message={errors.message} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Send
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        {chirps.map(chirp =>
                            <Chirp key={chirp.id} chirp={chirp} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
