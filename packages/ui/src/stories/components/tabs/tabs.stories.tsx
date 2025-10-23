import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../../../components/tabs/tabs";
import * as React from "react";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Account</Tabs.Tab>
        <Tabs.Tab value="tab2">Password</Tabs.Tab>
        <Tabs.Tab value="tab3">Team</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <h3 style={{ marginTop: 0 }}>Account Settings</h3>
        <p>Manage your account settings and preferences.</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <h3 style={{ marginTop: 0 }}>Password</h3>
        <p>Change your password and security settings.</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <h3 style={{ marginTop: 0 }}>Team</h3>
        <p>Manage your team members and permissions.</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <Tabs.Root defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home">Home</Tabs.Tab>
        <Tabs.Tab value="products">Products</Tabs.Tab>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="contact">Contact</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="home">
        <p>Welcome to our homepage!</p>
      </Tabs.Panel>
      <Tabs.Panel value="products">
        <p>Browse our products.</p>
      </Tabs.Panel>
      <Tabs.Panel value="about">
        <p>Learn more about us.</p>
      </Tabs.Panel>
      <Tabs.Panel value="contact">
        <p>Get in touch with us.</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [activeTab, setActiveTab] = React.useState("settings");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setActiveTab("profile")}>Go to Profile</button>
          <button onClick={() => setActiveTab("settings")}>Go to Settings</button>
          <button onClick={() => setActiveTab("notifications")}>Go to Notifications</button>
        </div>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
            <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="profile">
            <h3>Profile</h3>
            <p>Your profile information.</p>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <h3>Settings</h3>
            <p>Adjust your preferences.</p>
          </Tabs.Panel>
          <Tabs.Panel value="notifications">
            <h3>Notifications</h3>
            <p>Manage notification settings.</p>
          </Tabs.Panel>
        </Tabs.Root>

        <div style={{ fontSize: "14px", color: "#666" }}>
          Active tab: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
};

export const WithDisabledTabs: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab value="reports" disabled>
          Reports (Coming Soon)
        </Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings (Disabled)
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>Overview dashboard content</p>
      </Tabs.Panel>
      <Tabs.Panel value="analytics">
        <p>Analytics and insights</p>
      </Tabs.Panel>
      <Tabs.Panel value="reports">
        <p>Reports will be available soon</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p>Settings panel</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Tabs.Root defaultValue="general" orientation="vertical">
        <Tabs.List style={{ minWidth: "150px" }}>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <div style={{ flex: 1 }}>
          <Tabs.Panel value="general">
            <h3 style={{ marginTop: 0 }}>General Settings</h3>
            <p>Configure general application settings.</p>
          </Tabs.Panel>
          <Tabs.Panel value="security">
            <h3 style={{ marginTop: 0 }}>Security</h3>
            <p>Manage your security preferences.</p>
          </Tabs.Panel>
          <Tabs.Panel value="notifications">
            <h3 style={{ marginTop: 0 }}>Notifications</h3>
            <p>Control how you receive notifications.</p>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <h3 style={{ marginTop: 0 }}>Billing</h3>
            <p>View and manage billing information.</p>
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs.Root defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home">
          <span style={{ marginRight: "0.5rem" }}>🏠</span>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="search">
          <span style={{ marginRight: "0.5rem" }}>🔍</span>
          Search
        </Tabs.Tab>
        <Tabs.Tab value="favorites">
          <span style={{ marginRight: "0.5rem" }}>⭐</span>
          Favorites
        </Tabs.Tab>
        <Tabs.Tab value="settings">
          <span style={{ marginRight: "0.5rem" }}>⚙️</span>
          Settings
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="home">
        <p>Home page content</p>
      </Tabs.Panel>
      <Tabs.Panel value="search">
        <p>Search interface</p>
      </Tabs.Panel>
      <Tabs.Panel value="favorites">
        <p>Your favorite items</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p>Application settings</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tabs.Root defaultValue="documentation">
      <Tabs.List>
        <Tabs.Tab value="documentation">Documentation</Tabs.Tab>
        <Tabs.Tab value="examples">Examples</Tabs.Tab>
        <Tabs.Tab value="api">API Reference</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="documentation">
        <h3>Getting Started</h3>
        <p>
          This is a comprehensive guide to using our product. We'll walk you through all the
          features and capabilities available.
        </p>
        <h4>Installation</h4>
        <p>
          To install the package, run the following command in your terminal: npm install
          our-package
        </p>
        <h4>Basic Usage</h4>
        <p>
          Once installed, you can import the components and start using them in your application.
          Here's a simple example to get you started.
        </p>
        <h4>Advanced Features</h4>
        <p>
          Our package includes several advanced features that can help you build more complex
          applications. These features are designed to be easy to use while providing powerful
          functionality.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="examples">
        <h3>Code Examples</h3>
        <p>Here are some practical examples of using our components:</p>
        <pre
          style={{
            backgroundColor: "#f3f4f6",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`import { Component } from 'our-package';

function App() {
  return (
    <Component>
      Hello World
    </Component>
  );
}`}
        </pre>
      </Tabs.Panel>
      <Tabs.Panel value="api">
        <h3>API Reference</h3>
        <p>Complete API documentation for all available components and methods.</p>
        <h4>Props</h4>
        <ul>
          <li>
            <strong>value</strong>: string - The current active value
          </li>
          <li>
            <strong>defaultValue</strong>: string - The initial value
          </li>
          <li>
            <strong>onValueChange</strong>: (value: string) =&gt; void - Callback when value changes
          </li>
          <li>
            <strong>orientation</strong>: 'horizontal' | 'vertical' - Tab orientation
          </li>
        </ul>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List
        style={{
          backgroundColor: "#f3f4f6",
          padding: "0.25rem",
          borderRadius: "8px",
          border: "none",
        }}
      >
        <Tabs.Tab
          value="tab1"
          style={{
            borderRadius: "6px",
            padding: "0.5rem 1rem",
          }}
        >
          Design
        </Tabs.Tab>
        <Tabs.Tab
          value="tab2"
          style={{
            borderRadius: "6px",
            padding: "0.5rem 1rem",
          }}
        >
          Code
        </Tabs.Tab>
        <Tabs.Tab
          value="tab3"
          style={{
            borderRadius: "6px",
            padding: "0.5rem 1rem",
          }}
        >
          Preview
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <div style={{ padding: "1.5rem", backgroundColor: "#fef3c7", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0 }}>Design Mode</h3>
          <p>Create and edit your designs here.</p>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <div style={{ padding: "1.5rem", backgroundColor: "#dbeafe", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0 }}>Code Editor</h3>
          <p>Write and edit your code.</p>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <div style={{ padding: "1.5rem", backgroundColor: "#dcfce7", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0 }}>Preview</h3>
          <p>See your work in action.</p>
        </div>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Dashboard</Tabs.Tab>
        <Tabs.Tab value="tab2">Projects</Tabs.Tab>
        <Tabs.Tab value="tab3">Tasks</Tabs.Tab>
        <Tabs.Tab value="tab4">Calendar</Tabs.Tab>
        <Tabs.Tab value="tab5">Messages</Tabs.Tab>
        <Tabs.Tab value="tab6">Reports</Tabs.Tab>
        <Tabs.Tab value="tab7">Settings</Tabs.Tab>
        <Tabs.Tab value="tab8">Help</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <p>Dashboard overview</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <p>All projects</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <p>Task list</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab4">
        <p>Calendar view</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab5">
        <p>Message inbox</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab6">
        <p>Analytics reports</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab7">
        <p>Settings panel</p>
      </Tabs.Panel>
      <Tabs.Panel value="tab8">
        <p>Help documentation</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const DynamicTabs: Story = {
  render: function DynamicExample() {
    const [tabs, setTabs] = React.useState([
      { id: "tab1", title: "Tab 1", content: "Content for Tab 1" },
      { id: "tab2", title: "Tab 2", content: "Content for Tab 2" },
    ]);
    const [activeTab, setActiveTab] = React.useState("tab1");

    const addTab = () => {
      const newId = `tab${tabs.length + 1}`;
      setTabs([
        ...tabs,
        {
          id: newId,
          title: `Tab ${tabs.length + 1}`,
          content: `Content for Tab ${tabs.length + 1}`,
        },
      ]);
      setActiveTab(newId);
    };

    const removeTab = (id: string) => {
      if (tabs.length === 1) return;
      const newTabs = tabs.filter((tab) => tab.id !== id);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[0].id);
      }
    };

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={addTab}>Add Tab</button>
        </div>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.id}
                value={tab.id}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {tab.title}
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                    style={{
                      marginLeft: "0.25rem",
                      padding: "0.125rem 0.25rem",
                      fontSize: "12px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    aria-label={`Remove ${tab.title}`}
                  >
                    ×
                  </button>
                )}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.id} value={tab.id}>
              <p>{tab.content}</p>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    );
  },
};
