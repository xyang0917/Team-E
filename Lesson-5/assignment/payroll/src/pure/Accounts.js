import React from 'react'

export default function Accounts({
    accounts = [],
    onSelectedAccount
}) {
    return (
        <div className="pure-menu sidebar">
            <span className="pure-menu-heading">帐户列表</span>

            <ul className="pure-menu-list">
                {
                    accounts.map((account => (
                        <li className="pure-menu-item" key={account} onClick={onSelectedAccount}>
                            <a href="#" className="pure-menu-link">{ account }</a>
                        </li>
                    )))
                }
            </ul>
        </div>
    )
}