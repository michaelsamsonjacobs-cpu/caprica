# Position Data Folder

This folder contains position/role data that can be imported into Caprica AI.

## Folder Structure

```
positions/
├── README.md           # This file
├── templates/          # Example templates
│   └── sample_positions.json
├── imports/            # Place files here to import
│   └── .gitkeep
└── schemas/            # JSON schemas for validation
    └── position.schema.json
```

## Import Format

Positions can be imported as JSON or CSV. Each position should have:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| code | string | No | Unique identifier (e.g., "MOS-11B", "ENG-001") |
| title | string | Yes | Job title |
| description | string | Yes | Full job description |
| department | string | No | Department/division |
| requirements | string | Yes | Requirements text |
| skills | string[] | Yes | Array of required skills |
| experienceMin | number | No | Minimum years experience |
| experienceMax | number | No | Maximum years experience |
| educationLevel | string | No | Required education |
| salaryMin | number | No | Minimum salary |
| salaryMax | number | No | Maximum salary |

## Example

See `templates/sample_positions.json` for a complete example.
