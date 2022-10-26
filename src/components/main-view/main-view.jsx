import React from 'react';

// Create mainView using React.Component and expose it
export class MainView extends React.Component {
    render() {
        return (
            <div className="main-view">
                <div>Inception</div>
                <div>The Shawshank Redemption</div>
                <div>Gladiator</div>
            </div>
        );
    }
}