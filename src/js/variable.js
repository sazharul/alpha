// variable.js

// Menu structure for different roles
const menus = {
    admin: {
        navbar: [
            {
                type: "title",
                label: "#Super Admin"
            },
            {
                type: "link",
                label: "Dashboard",
                icon: "ri-dashboard-2-line",
                href: "/dashboard.html"
            },
            {
                type: "collapse",
                label: "Deposits",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2C",
                        href: "/p2c.html"
                    },
                    {
                        label: "P2P",
                        href: "/p2p.html"
                    }
                ]
            },
            {
                type: "collapse",
                label: "Withdrawals",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2P",
                        href: "./withdraw/p2p.html"
                    }
                ]
            },
            {
                type: "link",
                label: "SMS Management",
                icon: "ri-message-line",
                href: "/sms-management.html"
            },
            {
                type: "link",
                label: "Prepayment",
                icon: "ri-hand-coin-line",
                href: "/prepayment.html"
            },
            {
                type: "link",
                label: "Merchant Management",
                icon: "ri-store-3-line",
                href: "/merchant-management.html"
            },
            {
                type: "link",
                label: "Agent Management",
                icon: "ri-user-3-line",
                href: "/agent-management.html"
            },
            {
                type: "collapse",
                label: "Bank Management",
                icon: "ri-bank-card-line",
                subMenu: [
                    {
                        label: "Deposit",
                        href: "/bank-deposit.html",
                        subMenu: [
                            {label: "P2C", href: "/bank-deposit-p2c.html"},
                            {label: "P2P", href: "/bank-deposit-p2p.html"},
                        ],
                    },
                    {
                        label: "Withdraw",
                        href: "/bank-withdraw.html",
                        subMenu: [
                            {label: "P2P", href: "/bank-withdraw-p2p.html"},
                        ],
                    },
                ],
            },
            {
                type: "link",
                label: "Settlement Management",
                icon: "ri-user-3-line",
                href: "/settlement-management.html"
            },
            {
                type: "link",
                label: "Roles & Permission",
                icon: "ri-user-3-line",
                href: "/roles.html"
            },
        ]
    },

    merchant: {
        navbar: [
            {
                type: "title",
                label: "#Merchant"
            },
            {
                type: "link",
                label: "Dashboard",
                icon: "ri-dashboard-2-line",
                href: "/dashboard.html"
            },
            {
                type: "collapse",
                label: "Deposits",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2C",
                        href: "/p2c.html"
                    },
                    {
                        label: "P2P",
                        href: "/p2p.html"
                    }
                ]
            },
            {
                type: "collapse",
                label: "Withdrawals",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2P",
                        href: "./withdraw/p2p.html"
                    }
                ]
            },
            {
                type: "link",
                label: "Prepayment",
                icon: "ri-hand-coin-line",
                href: "/prepayment.html"
            },
            {
                type: "collapse",
                label: "Bank Management",
                icon: "ri-bank-card-line",
                subMenu: [
                    {
                        label: "Deposit",
                        href: "/bank-deposit.html",
                        subMenu: [
                            {label: "P2C", href: "/bank-deposit-p2c.html"},
                            {label: "P2P", href: "/bank-deposit-p2p.html"},
                        ],
                    },
                    {
                        label: "Withdraw",
                        href: "/bank-withdraw.html",
                        subMenu: [
                            {label: "P2P", href: "/bank-withdraw-p2p.html"},
                        ],
                    },
                ],
            },
        ]
    },

    agent: {
        navbar: [
            {
                type: "title",
                label: "#Agent"
            },
            {
                type: "link",
                label: "Dashboard",
                icon: "ri-dashboard-2-line",
                href: "/dashboard.html"
            },
            {
                type: "collapse",
                label: "Deposits",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2C",
                        href: "/p2c.html"
                    },
                    {
                        label: "P2P",
                        href: "/p2p.html"
                    }
                ]
            },
            {
                type: "collapse",
                label: "Withdrawals",
                icon: "ri-bank-line",
                subMenu: [
                    {
                        label: "P2P",
                        href: "./withdraw/p2p.html"
                    }
                ]
            },
            {
                type: "link",
                label: "Settlement Management",
                icon: "ri-list-unordered",
                href: "/settlement-management.html"
            }
        ]
    }
};

// Export the menus to use in other files
export default menus;
