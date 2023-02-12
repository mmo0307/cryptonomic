import React from 'react';

export function Arrow({color}: {color: string}):JSX.Element {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 4.18605C0 1.87416 1.87416 0 4.18605 0H10.814C13.1258 0 15 1.87416 15 4.18605V10.814C15 13.1258 13.1258 15 10.814 15H4.18605C1.87416 15 0 13.1258 0 10.814V4.18605ZM1.80248 7.58114C1.80248 7.87012 2.03675 8.10439 2.32574 8.10439H11.3583L8.93246 10.5302C8.72812 10.7346 8.72812 11.0659 8.93246 11.2702C9.13681 11.4746 9.46814 11.4746 9.67249 11.2702L12.7324 8.2103C13.1266 7.81605 13.1266 7.17691 12.7324 6.78265L9.67249 3.72275C9.46814 3.51841 9.13681 3.51841 8.93246 3.72275C8.72812 3.92709 8.72812 4.2584 8.93246 4.46274L11.5276 7.05788H2.32574C2.03675 7.05788 1.80248 7.29216 1.80248 7.58114Z"/>
        </svg>
    );
}