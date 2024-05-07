import Image from 'next/image';
import { Button } from '~/components/ui/button';

export default function Page() {
    return (
        <h1>
            Hello, Next.js!
            <div>
                <Button>Hello</Button>
            </div>
        </h1>
    );
}
