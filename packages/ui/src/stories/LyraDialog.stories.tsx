import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "../components/dialog/dialog";
import * as React from "react";

const meta: Meta<typeof Dialog.Root> = {
  title: "Components/Dialog",
  component: Dialog.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog.Root>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>
            This is a simple dialog with a title and description.
          </Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const WithoutBackdrop: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup>
          <Dialog.Title>No Backdrop</Dialog.Title>
          <Dialog.Description>
            This dialog doesn't have a backdrop overlay.
          </Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button onClick={() => setOpen(true)}>Open Dialog (External)</button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Controlled Dialog</Dialog.Title>
              <Dialog.Description>
                This dialog's state is controlled externally.
              </Dialog.Description>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <button onClick={() => setOpen(false)}>Cancel</button>
                <Dialog.Close>Confirm</Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Dialog is: <strong>{open ? "Open" : "Closed"}</strong>
        </div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: function FormExample() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Form Dialog</button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>User Information</Dialog.Title>
              <Dialog.Description>
                Please fill in your information below.
              </Dialog.Description>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: function ConfirmationExample() {
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
      console.log("Confirmed!");
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Delete Item</button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Confirm Deletion</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete this item? This action cannot be undone.
              </Dialog.Description>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                  marginTop: "1.5rem",
                }}
              >
                <button onClick={() => setOpen(false)}>Cancel</button>
                <button
                  onClick={handleConfirm}
                  style={{ backgroundColor: "#dc2626", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Open Long Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Terms and Conditions</Dialog.Title>
          <Dialog.Description>
            Please read and accept our terms and conditions.
          </Dialog.Description>
          <div style={{ marginTop: "1rem", maxHeight: "300px", overflowY: "auto" }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium.
            </p>
            <p>
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Dialog.Close>I Accept</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const NestedDialogs: Story = {
  render: function NestedExample() {
    const [firstOpen, setFirstOpen] = React.useState(false);
    const [secondOpen, setSecondOpen] = React.useState(false);

    return (
      <>
        <button onClick={() => setFirstOpen(true)}>Open First Dialog</button>

        {/* First Dialog */}
        <Dialog.Root open={firstOpen} onOpenChange={setFirstOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>First Dialog</Dialog.Title>
              <Dialog.Description>
                This is the first dialog. You can open another dialog from here.
              </Dialog.Description>
              <div style={{ marginTop: "1rem" }}>
                <button onClick={() => setSecondOpen(true)}>Open Second Dialog</button>
              </div>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Second Dialog */}
        <Dialog.Root open={secondOpen} onOpenChange={setSecondOpen}>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Second Dialog</Dialog.Title>
              <Dialog.Description>This is a nested dialog.</Dialog.Description>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Open Styled Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
        <Dialog.Popup
          style={{
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <Dialog.Title style={{ color: "#fff", fontSize: "24px" }}>
            Custom Styled Dialog
          </Dialog.Title>
          <Dialog.Description style={{ color: "#d1d5db" }}>
            This dialog has custom styling applied to its elements.
          </Dialog.Description>
          <Dialog.Close
            style={{
              marginTop: "1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};
