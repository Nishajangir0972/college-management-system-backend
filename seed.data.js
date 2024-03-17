export const defaultRoles = [
    {
        name: "STUDENT",
        isSuperAdmin: false,
        permissions: [
            "READ",
            "WRITE",
            "student.create"
        ]
    },
    {
        name: "SUPER ADMIN",
        isSuperAdmin: true,
        permissions: []
    }
]