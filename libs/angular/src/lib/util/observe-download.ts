import { HttpResponse } from '@angular/common/http';

export function observeDownload(type: string = 'application/pdf') {
    return (response: HttpResponse<Blob>) => {
        const blob = new Blob([response.body!], { type });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        const filename = response.headers.get('content-disposition')!.split('filename=')[1];
        anchor.download = filename.replace(/"/g, '');
        anchor.href = url;
        anchor.click();
    }
}
