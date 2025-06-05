import { Button, Card, TextInput, Title } from '@tremor/react';
import { useUsersActions } from '../hooks/useUsersActions';
import { useState } from 'react';

export function CreateNewUser() {
    const { addUser } = useUsersActions();
    const [ result, setResult ] = useState<'ok' | 'ko' | null>(null)

    const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setResult(null);

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            setResult('ko')
            return;
        }

        addUser({ name, email, github });
        setResult('ok');
        form.reset();
    }
    return (
        <Card className="mt-8" style={{ width: '600px' }}>
            <Title>Crear nuevo usuario</Title>
            <form className="mt-4" onSubmit={handleSumit}>
                <TextInput name='name' placeholder="Nombre" />
                <TextInput name='email' className="mt-4" placeholder="Email" />
                <TextInput name='github' className="mt-4" placeholder="GitHub" />
                <Button className="mt-4" type="submit">Crear</Button> 
            </form>
        </Card>
    )
}