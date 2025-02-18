# SPAnalytics

## Overview

SPAnalytics is a comprehensive data analysis tool designed to provide insights into procurement activities, user flows, and analytics. This application focuses on visualizing data, detecting anomalies, and offering detailed insights into various procurement processes.


**This is a prototype**

## Getting Started

To get started with SPAnalytics, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/SPAnalytics.git
   cd SPAnalytics
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the application:**
   Start the development server:
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8222` to view the application.

## Documentation

### Project Analysis & Approach

1. **Core Requirements Breakdown**
   - **Data Visualization Requirements**
     - Anomalies Detection
       - Fraudulent behavior indicators
       - Unusual purchase patterns (high/low)
       - Visual alerts and notifications
     - **Data Insights**
       - Macro view (zoomed-out aggregated data)
       - Micro view (zoomed-in detailed data)
       - Regional patterns Supply type analysis
     - **Trend Analysis**
       - Time-series visualization
       - Pattern recognition
       - Historical comparisons

2. **User Flow**
   - **Authentication Flow**
     - New users sign up and complete organization profile
     - Existing users directly login
     - Both paths lead to dashboard home
   - **Procurement Activities Flow**
     - Add new procurement activity
     - Select supplier
     - Enter purchase details
     - Add supporting documents
     - Submit for review
     - Return to dashboard
   - **Analytics Flow**
     - View analytics dashboard
     - Each section allows drill-down to detailed analysis
     - Option to export or share insights
   - **Settings Flow**
     - Configure alert thresholds
     - Add suppliers
     - Set up regions
   - **Filter Flow**
     - Apply various filters:
     - Filtered view updates dashboard

    flowchart TD
    A[User Arrives] --> B{Has Account?}
    B -->|No| C[Sign Up]
    B -->|Yes| D[Login]
    
    C --> E[Complete Organization Profile]
    D --> F[Dashboard Home]
    E --> F
    
    F --> G{Select Action}
    
    %% Procurement Activities Branch
    G -->|Add New| H[New Procurement Activity]
    H --> H1[Select Supplier]
    H1 --> H2[Enter Purchase Details]
    H2 --> H3[Add Supporting Documents]
    H3 --> H4[Submit for Review]
    H4 --> F
    
    %% Analytics Branch
    G -->|View Analytics| I[Analytics Dashboard]
    I --> I1[View Anomalies]
    I --> I2[View Trends]
    I --> I3[View Regional Insights]
    
    %% Drill Down Branch
    I1 --> J[Detailed Analysis]
    I2 --> J
    I3 --> J
    
    J --> K[Export Reports]
    J --> L[Share Insights]
    
    %% Settings Branch
    G -->|Configure| M[Settings]
    M --> M1[Set Alert Thresholds]
    M --> M2[Configure Regions]
    M --> M3[Manage Users]
    
    %% Filter Branch
    G -->|Filter Data| N[Apply Filters]
    N --> N1[By Date Range]
    N --> N2[By Region]
    N --> N3[By Supplier]
    N1 --> F
    N2 --> F
    N3 --> F
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#bbf,stroke:#333,stroke-width:2px
    style I fill:#bfb,stroke:#333,stroke-width:2px
    style H fill:#fbf,stroke:#333,stroke-width:2px

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the community for their support.
